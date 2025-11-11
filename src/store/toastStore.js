const toastStore = () => {
  let state = {
    show: false,
    type: "success",
    message: "장바구니에 추가되었습니다",
  };
  let timer;

  /**
   * @param {Object} newState - 상태 객체
   * @param {string} newState.type - 토스트 타입
   * @param {string} newState.message - 토스트 메시지
   */
  const set = (newState, render) => {
    if (timer) clearTimeout(timer);
    state = {
      show: true,
      ...newState,
    };
    render();

    timer = setTimeout(() => {
      close(render);
    }, 3000);
  };

  const close = (render) => {
    state.show = false;
    render();
  };

  const get = () => {
    return state;
  };

  return {
    get,
    set,
    close,
  };
};

export default toastStore;
