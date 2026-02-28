import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'modules/store';
import { Provider } from 'react-redux';
import App from './pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// StrictMode 모드는 어플리케이션의 잠재적인 문제를 확인하고 알려주는 도구(헬퍼 컴포넌트)
// 함수 컴포넌트 바디, 상태 업데이트 함수, useState 등을 2번씩 호출하는 것도 StrictMode 의 기능 중 하나
// 사이드 이펙트를 찾을 수 있도록 의도적으로 2번 호출(double-invoked)하는 것
// StrictMode 모드는 개발 환경에서만 적용되며, UI에 영향을 주지 않음(렌더링하지 않음)
// 문제가 의심되는 특정 부분에 추가해서 확인할 수도 있음
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
