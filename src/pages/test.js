import React, { useEffect, useState } from "react";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { useDispatch, useSelector } from "react-redux";
import { fetchTest, updateResultat } from "../store/services/testService";
import { useParams } from "react-router-dom";

const Test = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const testData = useSelector((state) => state.tests.tests);
  const loading = useSelector((state) => state.tests.loading);
  const error = useSelector((state) => state.tests.error);

  const [surveyModel, setSurveyModel] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchTest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (testData && testData.questions && testData.questions.length > 0) {
      const surveyJson = {
        title: "Test",
        maxTimeToFinish: 15, 
        showTimerPanel: "top",
        showTimerPanelMode: "both", // both = remaining + timer progress
        pages: [
          {
            elements: testData.questions.map((q, index) => ({
              type: q.propositions?.length > 0 ? "radiogroup" : "text",
              name: `q${index}`,
              title: q.questionText,
              choices: q.propositions?.length > 0 ? q.propositions : undefined,
              correctAnswer: q.reponse
            }))
          }
        ]
      };

      const model = new Model(surveyJson);

      model.onComplete.add((sender) => {
        const userAnswers = sender.data;
        let score = 0;

        testData.questions.forEach((q, index) => {
          const answer = userAnswers[`q${index}`];
          if (answer === q.reponse) {
            score++;
          }
        });

        console.log(`Score : ${score}`);
        dispatch(updateResultat(id, score));
      });

      setSurveyModel(model);
    }
  }, [testData, dispatch, id]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {surveyModel && <Survey model={surveyModel} />}
    </div>
  );
};

export default Test;
