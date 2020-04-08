const uploadProgress = progressEvent => {
    const bar = document.querySelector('.progressBar');

    const percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
    );
    bar.style.width = percentCompleted + '%';

    console.log(percentCompleted);
};

export default uploadProgress;
