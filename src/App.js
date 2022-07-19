//use libraries: weatherappdemo / styled-component(스타일링) / axios(api네트워크 통신 도움)
//api-url by openweathermap(built-in api request by city name)
//use data: test.json / temp, main

import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const API_KEY = '28bd20ea1d3179102df41688135ed4ef';
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
  //하향식 처리 방식으로 인해 적용이 안되므로 api_key와 변수들을 url변수 위에 둔다

  const searchWeather = async (e) => { //비동기 방식 진행을 위해 async / await 
    if(e.key === 'Enter') { //키다운 이벤트가 enter일때 api통신 진행
      try { //예외처리를 위한 try catch 사용
        const data = await axios({
          method: 'get', //가져오기 위해 get 사용
          url: url //어디에 가져올건지
        })
        setResult(data);//데이터를 받아와줌
      }
      catch (err) {
        alert(err);
      }
    }
  }

  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input
          placeholder='도시를 입력하세요'
          value={location}//state로 연결
          onChange={(e)=>setLocation(e.target.value)}//input값이 변할때마다 새 location에 변경
          type='text'
          onKeyDown={searchWeather}//버튼을 눌렀을때 호출이 되는 props지정
        />
        {Object.keys(result).length !== 0 && ( //가져온 값(12:31~, ({}) )이 빈 오브젝트가 아닐때 resultwrap을 띄움
          <ResultWrap>
            <div className='city'>{result.data.name}</div>
            <div className='temperature'>
              {Math.round((result.data.main.temp -273.15) * 10) / 10}℃
            </div>
            <div className='sky'>{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContetnWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }
  .input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;
  .city {
    font-size: 24px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;