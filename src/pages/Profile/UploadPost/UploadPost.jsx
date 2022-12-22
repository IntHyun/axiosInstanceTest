import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BtnUpload from '../../../components/button/BtnUpload';
import HeaderB from '../../../components/header/HeaderB';
import { Input, PreviewImg, SubmitImg, Wrap } from './uploadPostStyle';

const UploadPost = () => {
  const [imgFile, setImgFile] = useState('');
  const [desc, setDesc] = useState('');
  const imgRef = useRef();
  const textRef = useRef();
  const navigate = useNavigate();
  const URL = 'https://mandarin.api.weniv.co.kr';

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = '1px';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, []);

  const uploadPost = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const body = {
        post: {
          content: desc,
          image: imgFile,
        },
      };
      const res = await axios.post(`${URL}/post`, JSON.stringify(body), {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
      });
      console.log(res);
      navigate(`/profile`);
    } catch (error) {
      console.log(error);
      console.log('에러입니다');
    }
  };

  const imgApi = async () => {
    try {
      const file = imgRef.current.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post(`${URL}/image/uploadfile`, formData);
      const fileName = res.data.filename;
      setImgFile(`${URL}/${fileName}`);
    } catch (error) {
      console.log('에러입니다');
    }
  };

  return (
    <>
      <HeaderB />
      <Wrap>
        <form action="submit">
          <div>
            <Input
              placeholder="게시글 입력하기..."
              ref={textRef}
              onInput={handleResizeHeight}
              onChange={(e) => setDesc(e.target.value)}
            />
            <PreviewImg src={imgFile || null} alt="" />
          </div>
          <BtnUpload type="button" onClick={uploadPost}>
            업로드
          </BtnUpload>
          <input
            id="photo"
            type="file"
            style={{ display: 'none' }}
            onChange={() => {
              imgApi();
            }}
            ref={imgRef}
          />
          <SubmitImg htmlFor="photo" />
        </form>
      </Wrap>
    </>
  );
};

export default UploadPost;
