import api from "../config/api";

const BASE_URL = api.defaults.baseURL;

const PATHS = {
  AUTH:{
    LOGIN:`${BASE_URL}/admin/login`


  },
  DEPARTEMENT: {
    ALL: `${BASE_URL}/depart/allDep`,
    ADD:`${BASE_URL}/depart/add`,
    DELETE:`${BASE_URL}/depart/deleteDep`,
    UPDATE:`${BASE_URL}/depart/updateDep`,
},
OFFRE:{
        ALL_STAGE:`${BASE_URL}/offre/offreByStage`,
        ADD_STAGE:`${BASE_URL}/offre/addOffreStage`,
         ALL_JOB:`${BASE_URL}/offre/offreByJob`,
         ADD_JOB:`${BASE_URL}/offre/addOffreJob`,
         UPDATE_OFFRE_STAGE:`${BASE_URL}/offre/update`,
         DEACTIVE_OFFRE:`${BASE_URL}/offre/deactivateOffre`,
         ACTIVE_OFFRE:`${BASE_URL}/offre/activateOffre`
},
POST:{
  ALL_POST_STAGE:`${BASE_URL}/post/getAllPostStage`,
  ALL_POST_JOB:`${BASE_URL}/post/getAllPostJob`,
  ACCEPTER_POST:`${BASE_URL}/post/accepter`,
   REFUSER_POST:`${BASE_URL}/post/refuser`,
   DEMANDE:`${BASE_URL}/post/postWithoutOffre`,
   REFUSER_DEMANDE:`${BASE_URL}/post/refuserDemande`,
   ACCEPTER_DEMANDE:`${BASE_URL}/post/accepterDemande`,
   LOGIN_CANDIDAT:`${BASE_URL}/post/connecter`,
   MARK_COMPLETED:`${BASE_URL}/post/mark-completed`,
   VERIFIER:`${BASE_URL}/post/verifier`,
   



},
QUESTION:{
  ALL_QUESTION:`${BASE_URL}/question/getAllQuestion`,
  ADD_QUESTION:`${BASE_URL}/question/addQuestion`,
  DELETE_QUESTION:`${BASE_URL}/question/deleteQuestion`,
  UPDATE_QUESTION:`${BASE_URL}/question/updateQuestion`

},
QCM:{
  ALL_QCM:`${BASE_URL}/qcm/allQcm`,
  PASSER_TEST:`${BASE_URL}/qcm/generatQcm`,
  TEST:`${BASE_URL}/qcm/getQuestionByPost`,
  UPDATERESULTAT:`${BASE_URL}/qcm/updateResultat`

},
TEAM:{
  ALL_TEAM:`${BASE_URL}/team/all`,
  ADD_TEAM:`${BASE_URL}/team/add`,
  DELETE_TEAM:`${BASE_URL}/team/deleteTeam`,
  UPDATE_TEAM:`${BASE_URL}/team/updateTeam`
},
CONTACT:{
  ADD_CONTACT:`${BASE_URL}/contact/addContact`,
  GET_CONTACT:`${BASE_URL}/contact/allContact`,
  DELETE_CONTACT:`${BASE_URL}/contact/deleteContact`

}}
export default PATHS