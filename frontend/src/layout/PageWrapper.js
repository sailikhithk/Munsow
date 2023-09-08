import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/features/appStateSlice";
import appStateSlice from "../redux/features/appStateSlice";
const PageWrapper = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(appStateSlice(props.state));
    }
  }, [dispatch, props]);

  return <>{props.children}</>;
};

export default PageWrapper;
