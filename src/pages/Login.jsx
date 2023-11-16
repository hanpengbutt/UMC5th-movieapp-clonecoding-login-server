import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import REG_EXP from '../constants/regExp';
import { logIn } from '../store/reducers';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);

  const [pwdValue, setPwdValue] = useState('');
  const [isPwdValid, setIsPwdValid] = useState(false);
  const [showPwdErrorMessage, setShowPwdErrorMessage] = useState(false);

  const emailValidTest = emailInput => {
    const isValid = REG_EXP.email.test(emailInput);
    setIsEmailValid(isValid);
    setShowEmailErrorMessage(!isValid);
  };
  const pwdlValidTest = pwdInput => {
    const isValid = REG_EXP.pwd.test(pwdInput);
    setIsPwdValid(isValid);
    setShowPwdErrorMessage(!isValid);
  };
  const handleEmailChange = event => {
    setEmailValue(event.target.value);
    emailValidTest(event.target.value);
  };
  const handlePwdChange = event => {
    setPwdValue(event.target.value);
    pwdlValidTest(event.target.value);
  };
  const handleSubmitBtn = event => {
    dispatch(logIn());
    event.preventDefault();
    navigate('/');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmitBtn}>
        <LoginLabel>
          이메일과 비밀번호를
          <br />
          입력해주세요
        </LoginLabel>
        <Label htmlFor='email'>
          이메일 주소
          <Input
            type='email'
            id='email'
            value={emailValue}
            onChange={handleEmailChange}
          />
        </Label>
        {showEmailErrorMessage && (
          <ErrorMessage>올바른 이메일을 입력해주세요.</ErrorMessage>
        )}
        <Label htmlFor='password' value={pwdValue} onChange={handlePwdChange}>
          비밀번호
          <Input type='password' id='password' />
        </Label>
        {showPwdErrorMessage && (
          <ErrorMessage>올바른 비밀번호를 입력해주세요.</ErrorMessage>
        )}
        <SubmitBtn
          type='submit'
          value='확인'
          isValid={isEmailValid && isPwdValid}
        />
      </LoginForm>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 560px;
  padding: 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 30px;
`;

const LoginLabel = styled.h1`
  font-size: 32px;
  line-height: 40px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid lightGray;
  height: 26px;
  padding: 6px 4px;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: 4px 0px;
`;

const SubmitBtn = styled.input`
  height: 40px;
  padding: 6px;
  margin-top: 8px;
  border-radius: 50px;
  border: none;
  background-color: ${({ isValid }) => (isValid ? '#22254a' : 'Gainsboro')};
  color: ${({ isValid }) => (isValid ? 'white' : 'black')};
`;

export default Login;
