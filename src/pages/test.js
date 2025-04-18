import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest, updateResultat } from "../store/services/testService";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

const Test = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const testData = useSelector((state) => state.tests.tests);
  const error = useSelector((state) => state.tests.error);

  const [surveyModel, setSurveyModel] = useState(null);
  const [canTakeTest, setCanTakeTest] = useState(null);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tradrly/api/v1/post/verifier/${id}`);
        setCanTakeTest(res.data);
      } catch (err) {
        console.error("Erreur vérification:", err);
        setCanTakeTest(false);
      }
    };
    if (id) checkEligibility();
  }, [id]);

  useEffect(() => {
    if (id) dispatch(fetchTest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (canTakeTest && testData?.questions?.length > 0) {
      const surveyJson = {
        title: "Test technique",
        maxTimeToFinish: 15,
        showTimerPanel: "top",
        showTimerPanelMode: "both",
        locale: "fr",
        navigation: {
          next: "Suivant",
          previous: "Précédent",
          complete: "Terminer",
        },
        pages: testData.questions.map((q, index) => ({
          elements: [
            {
              type: q.propositions?.length > 0 ? "radiogroup" : "text",
              name: `q${index}`,
              title: q.questionText,
              choices: q.propositions?.length > 0 ? q.propositions : undefined,
              correctAnswer: q.reponse,
            },
          ],
        })),
      };

      const model = new Model(surveyJson);

      const savedAnswers = localStorage.getItem(`survey-answers-${id}`);
      if (savedAnswers) model.data = JSON.parse(savedAnswers);

      const savedTime = localStorage.getItem(`survey-timer-${id}`);
      if (savedTime) {
        const remainingTime = parseInt(savedTime, 10);
        if (!isNaN(remainingTime) && remainingTime > 0) {
          model.maxTimeToFinish = remainingTime;
          model.startTimer();
        }
      }

      model.onValueChanged.add((sender) => {
        localStorage.setItem(`survey-answers-${id}`, JSON.stringify(sender.data));
      });

      model.onTimerTick.add(() => {
        const timeLeft = model.maxTimeToFinish - model.timeSpent;
        if (!isNaN(timeLeft)) {
          localStorage.setItem(`survey-timer-${id}`, timeLeft.toString());
        }
      });

      model.onComplete.add(async (sender) => {
        const userAnswers = sender.data;
        let score = 0;

        testData.questions.forEach((q, index) => {
          if (userAnswers[`q${index}`] === q.reponse) {
            score++;
          }
        });

        dispatch(updateResultat(id, score));

        try {
          await axios.put(`http://localhost:5000/tradrly/api/v1/post/mark-completed/${id}`);
          setCanTakeTest(false);
        } catch (error) {
          console.error("Erreur mise à jour:", error);
        }

        localStorage.removeItem(`survey-answers-${id}`);
        localStorage.removeItem(`survey-timer-${id}`);
      });

      setSurveyModel(model);
    }
  }, [testData, canTakeTest, dispatch, id]);

  if (canTakeTest === null) return <div className="text-center mt-10">Chargement...</div>;

  if (!canTakeTest) {
    return (
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
          <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <Box
              sx={{
                position: "relative",
                width: 80,
                height: 80,
                mb: 3,
              }}
            >
              <FaCheckCircle
                style={{
                  fontSize: "60px",
                  color: "#4F46E5",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: "4px solid #4F46E5",
                  opacity: 0.2,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#4F46E5",
                mb: 2,
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Test Déjà Complété
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#4B5563", mb: 2, textAlign: "center" }}
            >
              Vous avez déjà soumis ce test technique. 
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#4B5563", mb: 4, textAlign: "center" }}
            >
              Je vous informerai des résultats dans quelques jours.
            </Typography>
           
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Évaluation technique</h2>
        <p className="mb-6 text-center text-gray-600">
          Merci de répondre à toutes les questions dans le temps imparti.
        </p>
        {error && <p className="text-red-500 text-center mb-4">Erreur : {error}</p>}
        {surveyModel && <Survey model={surveyModel} />}
      </div>
    </div>
  );
};

export default Test;