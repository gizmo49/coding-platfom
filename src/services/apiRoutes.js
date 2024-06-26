const BASE_PATH = '/coding-platform/api/v1';

export const apiRoutes = {
    login: `${BASE_PATH}/auth/sign-in`,
    signup: `${BASE_PATH}/auth/sign-up`,
    getProfile: `${BASE_PATH}/user/profile`,
    createChallenge: `${BASE_PATH}/coding-problem`,
    getChallenges: `${BASE_PATH}/coding-problems`,
    getChallengeById: (id) => `${BASE_PATH}/coding-problem/${id}`,
    runCodingSolution: `${BASE_PATH}/run/coding-problem`,
    saveCodingSolution: `${BASE_PATH}/attempt-problem`
};
