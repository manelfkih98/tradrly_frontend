import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest, updateResultat } from "../store/services/testService";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Dialog, DialogContent, Typography, Box ,Button} from "@mui/material";
import DOMPurify from "dompurify";
import { AES, enc } from "crypto-js";
import Confetti from "react-confetti";

const SECRET_KEY = process.env.REACT_APP_LOCALSTORAGE_SECRET || "default_secret_key";

// Sanitize a single question
const sanitizeQuestion = (question) => {
  if (!question) return null;
  return {
    questionText: DOMPurify.sanitize(question.questionText || ""),
    propositions: question.propositions?.map((prop) => DOMPurify.sanitize(prop || "")) || [],
    reponse: DOMPurify.sanitize(question.reponse || "")
  };
};

// Validate structure of questions
const validateQuestions = (questions) => {
  if (!Array.isArray(questions)) return false;
  return questions.every((q) => typeof q.questionText === "string" && typeof q.reponse === "string");
};

// Validate user answers
const validateUserAnswers = (userAnswers, questions) => {
  if (!userAnswers || !questions) return false;
  return Object.keys(userAnswers).every((key) => {
    const index = parseInt(key.replace("q", ""), 10);
    const question = questions[index];
    const answer = userAnswers[key];
    return question && (
      question.propositions?.includes(answer) || (typeof answer === "string" && answer.trim() !== "")
    );
  });
};

// LocalStorage helpers
const saveAnswers = (data, id) => {
  try {
    const encrypted = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(`survey-answers-${id}`, encrypted);
  } catch (err) {
    console.error("Erreur saveAnswers:", err);
  }
};

const loadAnswers = (id) => {
  try {
    const data = localStorage.getItem(`survey-answers-${id}`);
    if (!data) return null;
    const decrypted = AES.decrypt(data, SECRET_KEY).toString(enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    localStorage.removeItem(`survey-answers-${id}`);
    return null;
  }
};

const saveTimer = (timeLeft, id) => {
  try {
    const encrypted = AES.encrypt(timeLeft.toString(), SECRET_KEY).toString();
    localStorage.setItem(`survey-timer-${id}`, encrypted);
  } catch (err) {
    console.error("Erreur saveTimer:", err);
  }
};

const loadTimer = (id) => {
  try {
    const data = localStorage.getItem(`survey-timer-${id}`);
    if (!data) return null;
    const decrypted = AES.decrypt(data, SECRET_KEY).toString(enc.Utf8);
    return parseInt(decrypted, 10);
  } catch {
    localStorage.removeItem(`survey-timer-${id}`);
    return null;
  }
};

const Test = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const testData = useSelector((state) => state.tests.tests);
  const [surveyModel, setSurveyModel] = useState(null);
  const [canTakeTest, setCanTakeTest] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Vérifie si le test peut être effectué
  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tradrly/api/v1/post/verifier/${id}`);
        setCanTakeTest(res.data);

        // Si éligible, marquer comme "vu"
        if (res.data) {
          await axios.put(`http://localhost:5000/tradrly/api/v1/post/mark-viewed/${id}`);
        }
      } catch {
        setCanTakeTest(false);
      }
    };
    if (id) checkEligibility();
  }, [id]);

  // Récupère le test
  useEffect(() => {
    if (id) dispatch(fetchTest(id));
  }, [dispatch, id]);

  // Prépare le modèle du test
  useEffect(() => {
    if (canTakeTest && testData?.questions?.length > 0) {
      try {
        if (!validateQuestions(testData.questions)) throw new Error("Questions invalides");

        const sanitized = testData.questions.map(sanitizeQuestion);
        setTotalQuestions(sanitized.length);

        const surveyJson = {
          title: "Test technique",
          maxTimeToFinish: 30,
          showTimerPanel: "top",
          showTimerPanelMode: "both",
          locale: "fr",
          pages: sanitized.map((q, i) => ({
            elements: [{
              type: q.propositions?.length > 0 ? "radiogroup" : "text",
              name: `q${i}`,
              title: q.questionText,
              choices: q.propositions?.length > 0 ? q.propositions : undefined,
              correctAnswer: q.reponse,
            }]
          }))
        };

        const model = new Model(surveyJson);
        const saved = loadAnswers(id);
        if (saved) model.data = saved;

        const savedTime = loadTimer(id);
        if (savedTime) {
          model.maxTimeToFinish = savedTime;
          model.startTimer();
        }

        model.onValueChanged.add(sender => saveAnswers(sender.data, id));
        model.onTimerTick.add(() => saveTimer(model.maxTimeToFinish - model.timeSpent, id));

        model.onComplete.add(async sender => {
          const answers = sender.data;
          if (!validateUserAnswers(answers, sanitized)) {
            alert("Réponses invalides.");
            return;
          }

          const correct = sanitized.reduce((acc, q, i) => {
            return acc + (answers[`q${i}`] === q.reponse ? 1 : 0);
          }, 0);

          setScore(correct);

          try {
            dispatch(updateResultat(id, correct));
            await axios.put(`http://localhost:5000/tradrly/api/v1/post/mark-completed/${id}`);
            localStorage.removeItem(`survey-answers-${id}`);
            localStorage.removeItem(`survey-timer-${id}`);
            setCanTakeTest(false);
            setShowResults(true);
          } catch {
            alert("Erreur lors de la soumission.");
          }
        });

        setSurveyModel(model);
      } catch (err) {
        console.error("Erreur:", err);
      }
    }
  }, [testData, canTakeTest, dispatch, id]);

  // Chargement
  if (canTakeTest === null) return <div className="text-center mt-10">Chargement...</div>;

  // Test déjà effectué
  if (!canTakeTest && !showResults) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <Box textAlign="center" p={2}>
            <FaCheckCircle size={60} color="#4F46E5" />
            <Typography variant="h5" mt={2} fontWeight="bold" color="primary">Test déjà effectué</Typography>
            <Typography color="text.secondary" mt={1}>Vous avez déjà réalisé ce test technique.</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Les résultats sont en cours de traitement.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  // Affichage des résultats
  if (showResults) {
    const isPerfectScore = score === totalQuestions;
    const starCount = isPerfectScore
      ? 5
      : Math.min(Math.floor((score / totalQuestions) * 5), 5);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Confetti />
        <Dialog
          open={true}
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: "easeOut" },
            sx: {
              borderRadius: "16px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              maxWidth: "450px",
              width: "100%",
            },
          }}
          BackdropProps={{
            component: motion.div,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 },
            sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          }}
        >
          <DialogContent sx={{ p: 4 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#4B5563",
                  mb: 4,
                  fontWeight: "bold",
                }}
              >
                Résultats du Quiz
              </Typography>
              <Box sx={{ position: "relative", mb: 6 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: 150,
                    height: 150,
                    background: "#4CAF50",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {score} / {totalQuestions}
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "24px",
                    color: "#fff",
                  }}
                ></motion.div>
              </Box>
              <Box display="flex" justifyContent="center" mb={4}>
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    style={{
                      fontSize: "24px",
                      color: index < starCount ? "#FFD700" : "#D3D3D3",
                      margin: "0 2px",
                    }}
                  />
                ))}
              </Box>
              <Button
                variant="contained"
                onClick={() => setShowResults(false)} // Close the dialog
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  "&:hover": { backgroundColor: "#FFB300" },
                }}
              >
                {isPerfectScore ? "Score Parfait !" : "Fermer"}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Test actif
  return (
    <div className="max-w-4xl mx-auto p-4">
      {surveyModel && <Survey model={surveyModel} />}
    </div>
  );
};

export default Test;


