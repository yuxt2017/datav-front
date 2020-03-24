import Mock from 'mockjs';

const mock = {
    getUserInfo() {
        Mock.mock('http://api.apiopen.top/login', 'post', () => {
            const userInfo = {
                name: 'admin',
                userId: 134,
            };
            return userInfo;
        });
    },
};

export default mock;
