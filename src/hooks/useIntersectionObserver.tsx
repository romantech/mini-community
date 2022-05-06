// 코드 일부 참고 : https://mrcoles.com/intersection-observer-react-hook/
import { useCallback, useEffect, useRef } from 'react';

interface IOProps {
  callback: VoidHandler;
  unObserve?: boolean;
  options?: IntersectionObserverInit;
}

export default function useIntersectionObserver<T extends HTMLElement>({
  callback,
  unObserve = false,
  options = {
    root: null, // 노출&비노출 여부를 어떤 요소를 기준으로 할지 지정하는 옵션. 기본값 null(뷰포트)
    rootMargin: '0px', // 바깥 여백(Margin)을 이용해 Root 범위를 확장/축소하는 옵션. 기본값 0px
    threshold: 0, // 화면에 얼만큼 노출돼야 콜백 함수를 호출할지 결정하는 옵션. 기본값 0(1px 라도 화면에 보이면 콜백 호출)
  },
}: IOProps) {
  const ioRef = useRef<T>(null);

  // Intersection Observer 콜백 정의(useCallback 적용은 选项)
  // (인자1) entries: 관찰 중인 모든 대상이 담긴 배열, (인자2) observer: 관찰자 객체
  const ioHandler: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 화면 안에 타겟 요소가 들어왔는지 체크
          callback(); // 교차 시점에(관찰 대상이 뷰포트에 노출) 인자로 받은 콜백 호출
          if (unObserve) observer.unobserve(entry.target); // (조건 만족시) 해당 타겟은 관찰 중지
        }
      });
    },
    [callback, unObserve],
  );

  useEffect(() => {
    if (!window.IntersectionObserver || !ioRef.current) return undefined;
    const observer = new IntersectionObserver(ioHandler, options); // 콜백&옵션 등록 및 IO 객체 생성
    observer.observe(ioRef.current); // 인자로 넘긴 요소를 관찰 대상으로 등록

    return () => observer.disconnect(); // 언마운트시 모든 요소에 대한 관찰 중지
  }, [ioHandler, options]);

  return ioRef;
}
