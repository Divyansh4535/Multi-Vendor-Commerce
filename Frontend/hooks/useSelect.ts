import { useDispatch, useSelector } from "react-redux";

export const useRedux = () => {
  const selector = useSelector((state: any) => state);
  const dispatch = useDispatch();
  return {
    selector,
    dispatch,
  };
};
