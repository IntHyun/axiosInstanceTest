import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormStyle, InvalidSpan } from './formStyle';
import StyledButton from '../../components/button/BtnForm';
import { LoginContDiv, SignupLink } from './loginStyle';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const URL = 'https://mandarin.api.weniv.co.kr';
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post(`${URL}/user/login`, {
      user: { email: `${email}`, password: `${password}` },
      headers: { 'Content-Type': 'application/json' },
    });

    setErrorMsg(res.data.message);
    if (res.data.message) {
      console.log('안되용~');
    } else {
      navigate('/home');
    }
  };

  return (
    <LoginContDiv>
      <h2>로그인</h2>
      <FormStyle>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <InvalidSpan>{errorMsg}</InvalidSpan>
        <StyledButton type="submit" onClick={login}>
          로그인
        </StyledButton>
        <SignupLink to="/">이메일로 회원가입</SignupLink>
      </FormStyle>
    </LoginContDiv>
  );
};

export default LoginForm;
