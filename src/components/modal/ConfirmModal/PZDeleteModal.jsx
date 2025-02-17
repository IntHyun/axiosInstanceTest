import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal, Btnwrap } from './confirmModalStyle';

const PZDeleteModal = ({ deleteHandler, props }) => {
  const productId = props.id;
  const navigate = useNavigate();
  async function deletePZ(value) {
    try {
      const URL = 'https://api.mandarin.weniv.co.kr';
      const authToken = localStorage.getItem('token');
      const res = await axios.delete(`${URL}/product/${value}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-type': 'application/json',
        },
      });
      if (res) {
        navigate(0);
      }
    } catch (error) {
      console.log(error.res);
    }
  }

  return (
    <ConfirmModal>
      <h3>포토존을 삭제할까요?</h3>
      <Btnwrap>
        <button
          type="button"
          onClick={() => {
            deleteHandler();
          }}
        >
          취소
        </button>
        <button
          type="button"
          className="caution-option"
          onClick={() => {
            deletePZ(productId);
          }}
        >
          삭제
        </button>
      </Btnwrap>
    </ConfirmModal>
  );
};

export default PZDeleteModal;
