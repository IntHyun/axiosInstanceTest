import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { SpotTab, SpotBtn, FeedList, Feed, FeedImg } from './homeStyle';

const HomeFeed = () => {
  const [btnActive, setBtnActive] = useState('');
  const [name, setName] = useState('');
  const [btnOn, setBtnOn] = useState(false);
  const navigate = useNavigate();

  // 무한 스크롤
  const [feedPost, setFeedPost] = useState([]);
  const [numFeed, setNumFeed] = useState(20);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const URL = 'https://mandarin.api.weniv.co.kr';

  // 썸네일 리스트 API
  const getFeed = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${URL}/product/?limit=${numFeed}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });

      if (response) {
        setFeedPost(response.data.product);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  }, [numFeed]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  useEffect(() => {
    if (inView && !loading) {
      setNumFeed((current) => current + 10);
    }
  }, [inView, loading]);

  // 포토존 이미지 클릭시 상세 페이지로 이동
  const handleDetailPost = ({ item }) => {
    console.log(item);
    navigate('/photodetail', {
      state: {
        image: `${item.author.image}`,
        username: `${item.author.username}`,
        accountname: `${item.author.accountname}`,
        itemImage: `${item.itemImage}`,
        itemName: `${item.itemName}`,
        link: `${item.link}`,
        createdAt: `${item.createdAt}`,
      },
    });
  };

  // 지역명 중복 체크
  const placeFilter = [
    ...new Set(feedPost && feedPost.map((item) => item.itemName)),
  ];

  // 지역 버튼 클릭시 해당 게시글 렌더링
  const handlePlace = (e, { item }) => {
    console.log(item);
    setBtnActive(() => {
      return e.target.value;
    });
  };

  return (
    <>
      <SpotTab>
        {placeFilter.map((item) => (
          <SpotBtn
            key={crypto.randomUUID()}
            value={item}
            className={item === btnActive ? 'active' : ''}
            onClick={(e) => {
              setName(item);
              handlePlace(e, { item });
              setBtnOn(true);
            }}
          >
            {item}
          </SpotBtn>
        ))}
      </SpotTab>

      <FeedList>
        {btnOn
          ? feedPost
              .filter((item) => item.itemName === name)
              .map((item) => (
                <Feed key={crypto.randomUUID()}>
                  <FeedImg
                    src={item.itemImage}
                    alt=""
                    onClick={() => handleDetailPost({ item })}
                  />
                </Feed>
              ))
          : feedPost.map((item, i) =>
              feedPost.length - 1 === i ? (
                <div ref={ref} />
              ) : (
                <Feed key={crypto.randomUUID()}>
                  <FeedImg
                    key={item.id}
                    src={item.itemImage}
                    alt=""
                    onClick={() => handleDetailPost({ item })}
                  />
                </Feed>
              ),
            )}
      </FeedList>
    </>
  );
};

export default HomeFeed;
