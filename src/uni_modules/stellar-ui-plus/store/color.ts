import { createStore } from 'vuex'; //导入createStore构造函数
const colorStore = createStore({
    state: {
        //Vuex的状态，实际上就是存数据的地方
        color: {
            steThemeColor: '#0090FF',
            defaultColor: '#0090FF',
        },
    },
    getters: {
        //提供获取Vux状态的方式, 注意在组件中调用时getPerson是以属性的方式被访问
        getColor(state) {
            return state.color;
        },
    },
    mutations: {
        //提供直接操作Vuex的方法，注意mutations里的方法中不能有任何异步操做
        setColor(state, value) {
            //第一个参数state为Vuex状态；第二个参数为commit函数传来的值
            Object.assign(state.color, value);
        },
    },
});

// import { reactive } from 'vue';
// const color = reactive({
//     steThemeColor: '#0090FF',
//     defaultColor: '#0090FF',
// });
// // 主题色内容
// export function useColorStore() {
//     const getColor = () => {
//         return color;
//     };
//     const setColor = (value: any) => {
//         Object.assign(color, value);
//         console.log('color', color);
//     };

//     return {
//         color,
//         getColor,
//         setColor,
//     };
// }
