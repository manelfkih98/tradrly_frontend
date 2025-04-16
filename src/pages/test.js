import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest, updateResultat } from "../store/services/testService";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        pages: [
          {
            elements: testData.questions.map((q, index) => ({
              type: q.propositions?.length > 0 ? "radiogroup" : "text",
              name: `q${index}`,
              title: q.questionText,
              choices: q.propositions?.length > 0 ? q.propositions : undefined,
              correctAnswer: q.reponse,
            })),
          },
        ],
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
  if (!canTakeTest)
    return (
      <div className="text-center text-lg text-gray-600 mt-10">
        Vous avez déjà passé ce test.
      </div>
    );

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
