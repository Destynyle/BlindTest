import { setAccessToken, setRefreshToken, getQueryParam } from "helpers"
import { useNavigate } from "react-router-dom";
import instance, { retrieveAccessToken } from 'services/SpotifyAPI'
import { useContext, useEffect } from 'react'
import { BlindTestContext } from "App";

const LoginCallback = () => {

  const { setLoggedIn } = useContext(BlindTestContext);
  const navigate = useNavigate()

  useEffect(() => {
    const code = getQueryParam('code')
    if (code) {
      retrieveAccessToken(code).then(response => {
        setRefreshToken(response.data.refresh_token);
        const accessToken = response.data.access_token;
        setAccessToken(accessToken);
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        setLoggedIn(true);
        navigate("/");
      })
    } else {
      navigate("/")
    }
  }, [navigate, setLoggedIn]);

  return (
    <div className="spinner"></div>
  )
}

export default LoginCallback
