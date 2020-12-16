实现一个 Tabs 组件，点击 Tab 切换显示的内容。

进一步思考：

1. tab content 可以是任意内容（字符串、组件等）。
2. 如何让 Tabs 组件可以同时支持“受控”与“非受控”两种使用方式。

```vue
<!-- Tabs.vue -->
<template>
    <div class="tabs">
      	<!-- Control Tabs -->
        <div class="tab-controls">
            <div
                class="tab-control"
                :class="{ active: idx === _activeIdx }"
                :key="idx"
                v-for="(tab, idx) in tabs"
                @click="handleActiveIdxChange(tab, idx)"
            >
                {{ tab.title }}
            </div>
        </div>
				
      	<!-- Tab Contents -->
        <div class="tab-content">
            <span v-if="$slots.default">
                <slot></slot>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Tabs",
    props: {
        tabs: Array,
        activeIdx: Number,
        defaultActiveIdx: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            localActiveIdx: this.defaultActiveIdx,
        };
    },
    computed: {
        // degrade activeIdx when undefined
        _activeIdx() {
            return this.activeIdx || this.localActiveIdx;
        },
    },
    methods: {
        handleActiveIdxChange(tab, idx) {
            // uncontrolled tab behavior
            if (this.activeIdx === undefined) {
                this.localActiveIdx = idx;
                this.$parent.currentUnctrlContent &&
                    (this.$parent.currentUnctrlContent = tab.component);
            }
            // controlled tab behavior
            this.$emit("active-idx-change", { tab, idx });
        },
    },
};
</script>

<style scoped>
.tab-controls {
    display: flex;
    background: #f1f3f5;
    padding: 0.25em 1em;
}
.tab-control {
    padding: 0.5em;
    cursor: pointer;

    /* remove user select effect */
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -ms-user-select: none;
}
.tab-control:hover {
    background: white;
}
.tab-control.active {
    border-bottom: 2px solid blue;
}
.tab-content {
    padding: 1em;
    border: 1px solid #f1f3f5;
}
</style>
```

```vue
<!-- App.vue -->
<template>
    <div id="app">
        <h1>Tab Demo</h1>
        <h2>Uncontrolled Tabs</h2>
        <tabs :tabs="tabs" :defaultActiveIdx="0">
            <keep-alive>
                <component :is="currentUnctrlContent"></component>
            </keep-alive>
        </tabs>
        <h2>Controlled Tabs</h2>
        <tabs
            :tabs="tabs"
            :activeIdx="activeIdx"
            @active-idx-change="handleChange($event)"
        >
            <keep-alive>
                <component :is="currentCtrlContent"> </component>
            </keep-alive>
        </tabs>
    </div>
</template>

<script>
import Tabs from "./components/Tabs";
import HelloWorld1 from "./components/HelloWorld1";
import HelloWorld2 from "./components/HelloWorld2";
import HelloWorld3 from "./components/HelloWorld3";

export default {
    name: "App",
    components: {
        Tabs,
        HelloWorld1,
        HelloWorld2,
        HelloWorld3,
    },
    data() {
        return {
            currentUnctrlContent: HelloWorld1,
            currentCtrlContent: HelloWorld1,
            tabs: [
                {
                    title: "title1",
                    component: HelloWorld1,
                },
                {
                    title: "title2",
                    component: HelloWorld2,
                },
                {
                    title: "title3",
                    component: HelloWorld3,
                },
            ],
            activeIdx: 0,
        };
    },
    methods: {
      	// controlled tab behavior
        handleChange({ tab, idx }) {
            alert(tab.title);
            this.activeIdx = idx;
            this.currentCtrlContent = tab.component;
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
```

```vue
<!-- HelloWorld*.vue -->
<template>
    <div class="hello">
        <h1>HelloWorld*</h1>
    </div>
</template>

<script>
export default {
    name: "HelloWorld*",
};
</script>

<style scoped></style>
```

