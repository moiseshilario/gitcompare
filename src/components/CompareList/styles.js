import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  margin-top: 50px;
`;

export const Repository = styled.div`
  display: flex;
  flex-direction: column;

  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 15px 20px;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    padding: 30px;

    img {
      width: 64px;
      border-radius: 3px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #696969;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #777;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #555;
  font-size: 14px;
  border: 0;
  cursor: pointer;

  &:hover {
    color: #aaa;
  }
`;

export const UpdateButton = styled.button`
  margin-top: 15px;
  padding: 10px 30px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #666;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  font-weight: bold;

  &:hover {
    background: #777;
    color: #fff;
    border: 1px solid #777;
  }
`;
