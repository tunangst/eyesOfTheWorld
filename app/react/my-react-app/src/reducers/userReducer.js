const initialUser = {
    userName: ''
};

const user = (state = initialUser, action) => {
    const { type, payload } = action;
    switch (type) {
        default:
            return state;
    }
};

export default user;
