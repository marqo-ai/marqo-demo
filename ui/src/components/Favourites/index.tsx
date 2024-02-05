import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearFavourites, removeFavourite } from '../../store/slices/app-slice';
import { Button } from 'react-daisyui';
import { useSelector } from '../../store';
import { List, Modal, Image } from 'antd';

type favItems = {
  item: string;
};

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites } = useSelector(({ app }) => app);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [favData, setFavData] = useState<favItems[]>([]);

  const handleRemoveFavourite = (term: string) => {
    dispatch(removeFavourite(term));
  };

  const showModel = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleClearFavourites = () => {
    dispatch(clearFavourites());
  };

  useEffect(() => {
    let tempFavData: favItems[] = [];
    for (let i = 0; i < favourites.length; i++) {
      tempFavData.push({ item: favourites[i] });
    }
    setFavData(tempFavData);
  }, [favourites]);

  return (
    <>
      <Button onClick={showModel} className="btn btn-sm btn-primary">
        {`Edit Favourites (${favourites.length})`}
      </Button>
      <Modal
        title="Favourites"
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <div className="flex justify-between w-full">
            <Button className="btn btn-sm btn-error" onClick={handleClearFavourites}>
              Clear All
            </Button>
            <Button className="btn btn-sm btn-success" onClick={handleOk}>
              Ok
            </Button>
          </div>,
        ]}
      >
        <div className={`favourite-tags`}>
          <p>Favourites are added into each search as context.</p>
          <List
            itemLayout="horizontal"
            dataSource={favData}
            renderItem={(item: favItems, index) => (
              <List.Item
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={() => {
                      handleRemoveFavourite(item.item);
                    }}
                  >
                    delete
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image width={40} src={item.item.startsWith('https://') ? item.item : ''} />
                  }
                  title={item.item.startsWith('https://') ? 'Image' : item.item}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default Favourites;
