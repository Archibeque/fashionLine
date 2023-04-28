import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/counter/apiCalls";

import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  color: pink;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Check = styled.input`
  
`


const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const LoginLink =  styled.div`
font-size: 12px;
margin-top: 15px;
margin-left: 20px;

`

const Register = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch();


  const { isFetching } = useSelector((state) => state.user);
  
  function validatePassword (password, password2) {
    password === password2 ? <>passwords match</>: <Error>passwords Do not Match</Error>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(dispatch, { firstname, lastname, email, username, password });
  }



  console.log(`firstname: ${firstname}, lastname: ${lastname}, email: ${email}, username: ${username}, password: ${password}, password2: ${password2}, checked: ${checked}`)
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" onChange={e => setFirstname(e.target.value)} />
          <Input placeholder="last name" onChange={e => setLastname(e.target.value)} />
          <Input placeholder="username" onChange={e => setUsername(e.target.value)} />
          <Input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
          <Input type="password" placeholder="confirm password" onChange={e => setPassword2(e.target.value)} validatePassword={validatePassword()} />
          { validatePassword}
          <Agreement>
            <Check type="checkbox" onClick={() => setChecked(!checked)} />
             By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={firstname ==="" || lastname ==="" || email ==="" 
            || password ==="" || password2 ==="" || checked===false || isFetching}
            onClick={handleSubmit}>CREATE</Button>
          <LoginLink>
            <span>Already Have An Account
            <Link style={{textDecoration: "none", marginLeft: "15px"}} to="/login">Login</Link>
            </span>
          </LoginLink>
          
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
