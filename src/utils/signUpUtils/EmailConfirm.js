import usePost from "hooks/axiosWithCredentials/usePost";
const EmailConfirm = async (props) => {
  const { postWithCredentials } = usePost();
  const useEmail = { email: props };
  console.log(props);
  try {
    const res = await postWithCredentials(`/api/checkEmail`, useEmail);
    console.log(res);
    if (res.status === 200) {
      return res.checkEmail;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export default EmailConfirm;
