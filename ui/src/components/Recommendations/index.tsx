import { useEffect, useState } from 'react';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { Breadcrumb, Modal, Slider } from 'antd';
import {
  clearRecommendations,
  setIsRecommendationLoading,
  setRecommendations,
  setSelectedItem,
  setShowRecommendations,
} from '../../store/slices/app-slice';
import { SearchHit } from '../../api/types';
import { useDispatch, useSelector } from '../../store';
import { postRecommendItem } from '../../store/thunks';
import RecommendationPanel from './recommendationPanel';

const RecommendationModal = () => {
  const [history, setHistory] = useState<BreadcrumbItemType[]>([]);
  const [difference, setDifference] = useState(0);

  const recLimit = 7;

  const { dataset, selectedItem, showRecommendations } = useSelector(({ app }) => app);

  const dispatch = useDispatch();

  const handleChangeBreadcrumb = (newProduct: SearchHit | null) => {
    if (newProduct !== null) {
      const existingIndex = history.findIndex((item) => item.key === newProduct._id);

      if (existingIndex !== -1) {
        const newHistory = history.slice(0, existingIndex + 1);
        setHistory(newHistory);
      } else if (newProduct._id !== history[history.length - 1]?.key) {
        const newHistory = [...history];
        newHistory.push({
          key: newProduct._id,
          title: (
            <a
              onClick={() => {
                dispatch(setSelectedItem(newProduct));
              }}
            >
              {newProduct.title}
            </a>
          ),
        });
        setHistory(newHistory);
      }
    }
  };

  const handleClose = () => {
    // dispatch(clearRecommendations());
    dispatch(setShowRecommendations(false));
    setDifference(0);
    setHistory([]);
  };

  const handleRecommend = () => {
    if (selectedItem !== null) {
      setIsRecommendationLoading(true);
      dispatch(
        postRecommendItem({
          itemID: selectedItem._id,
          limit: recLimit,
          index: dataset,
          offset: difference * 2,
        }),
      );
    }
  };

  useEffect(() => {
    handleRecommend();
    handleChangeBreadcrumb(selectedItem);
  }, [selectedItem]);

  const handleDifferenceChange = (value: number) => {
    setDifference(value);
  };

  const handleSliderComplete = (value: number) => {
    dispatch(clearRecommendations());
    if (selectedItem !== null) {
      dispatch(
        postRecommendItem({
          itemID: selectedItem._id,
          limit: recLimit,
          index: dataset,
          offset: value,
        }),
      );
    }
  };

  return (
    <Modal
      title="Recommendations"
      open={showRecommendations}
      onOk={handleClose}
      onCancel={handleClose}
      cancelButtonProps={{ style: { display: 'none' } }}
      width={1000}
    >
      <div>
        <p>Difference</p>
        <Slider
          defaultValue={0}
          min={0}
          max={100}
          value={difference}
          onChange={handleDifferenceChange}
          onChangeComplete={handleSliderComplete}
        />
      </div>
      <Breadcrumb items={history} />
      <RecommendationPanel />
    </Modal>
  );
};

export default RecommendationModal;
