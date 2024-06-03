

export const ModalLoading = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full mx-auto pt-4">
      <div className="flex space-x-2 justify-center items-center bg-white h-full ">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce"></div>
      </div>
      <h1 className="text-lg text-primary-600 leading-7 font-bold text-center">
        음성을 텍스트로 변환 중입니다.
      </h1>
    </div>
  );
};
