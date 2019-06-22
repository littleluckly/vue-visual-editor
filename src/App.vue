<template>
    <div id="app">
        <div class="topWrap"></div>
        <div class="content">
            <div class="left">
                <h3>组件列表</h3>
                <ComponentsList/>
            </div>
            <div class="preview" @dragover="dragOver" @drop="drop">
                <h3>预览区域</h3>
                <transition-group name="list" tag="p">
                    <div v-for="component in components" :key="component.id" :data-id="component.id" @contextmenu="(e)=>rightClick(e, component.id)">
                        <component :is="component.componentName"/>
                    </div>
                </transition-group>
            </div>
            <div class="right">
                <h3>属性</h3>
            </div>
        </div>

        <el-card class="box-card" v-show="dialogVisible">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
            </div>
            <p @click="delComponent(clickCompId)">删除</p>
        </el-card>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ComponentsList from './components';
import HelloWorld from '@/components/HelloWorld';
import { uuid } from '@/utils';
export default {
    components: {
        ComponentsList,
        HelloWorld
    },
    data() {
        return {
            dialogVisible: false,
            clickCompId: ''
        };
    },
    computed: {
        ...mapState({
            components: state => state.components
        })
    },
    methods: {
        ...mapActions(['delComponent']),
        dragOver(e) {
            e.preventDefault();
        },
        drop(e) {
            let info = JSON.parse(e.dataTransfer.getData('info'));
            this.$store.commit('components', { ...info, id: uuid() });
        },
        rightClick(e, id) {
            e.preventDefault();
            this.dialogVisible = true;
            this.clickCompId = id;
            document.querySelector('.box-card').style.left = e.pageX + 'px';
            document.querySelector('.box-card').style.top = e.pageY + 'px';
        }
    },
    mounted() {
        document.body.addEventListener('click', () => {
            this.dialogVisible = false;
        });
    }
};
</script>
<style lang="scss">
body {
    margin: 0;
    height: 100vh;
}
p {
    margin: 0;
}
.content {
    display: flex;
    .left {
        width: 300px;
    }
    .right {
        width: 300px;
    }
    .preview {
        flex: 1;
        border: 1px solid #ddd;
        position: relative;
    }
}
.box-card {
    position: absolute;
    width: 180px;
    p {
        cursor: pointer;
    }
}
.list-item {
    display: inline-block;
    margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>
