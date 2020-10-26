<template>
  <div class="popup" style="display: block">
    <div class="popup-main planPopup-edit-main operationLog">
      <div class="popup-title">
        <label>{{title}}</label>
        <em class="popup-close" @click="hide">×</em>
      </div>
      <div class="popup-content">
        <slot :list="listData"/>
        <div id="PageBar"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectTablePopup",
    props: {
      title: String,
      listKey: String,
      api: Function,
      searchData: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        postData: {
          pageNo: 1,
          pageSize: 5,
        },
        listData: [],
      }
    },
    methods: {
      hide() {
        this.$emit('hide');
      },
      getList(pageNo) {
        var vm = this;
        vm.postData.pageNo = pageNo;
        layer.load(2);
        this.api({...vm.postData, ...vm.searchData})
          .then(ret => {
            layer.closeAll("loading");
            if (ret.code == 200) {
              vm.listData = ret.data[this.listKey];
              laypage({
                //分页
                cont: "PageBar", //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                pages: ret.page.totalPages, //通过后台拿到的总页数
                curr: pageNo,
                skin: "#95C93E", //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                jump: function (obj, first) {
                  //触发分页后的回调
                  if (!first) {
                    //一定要加此判断，否则初始时会无限刷新
                    vm.getList(obj.curr);
                  }
                }
              });
            } else {
              if (ret.code == "500" && ret.data == "查询错误，没有数据") {
                layer.msg("暂无数据");
                vm.listData = [];
              } else {
                layer.alert(ret.data, {closeBtn: 0});
              }
            }
          })
          .catch(err => {
            layer.closeAll("loading");
            layer.alert(err.message, {closeBtn: 0});
          });
      },
      submit() {
      }
    },
    mounted() {
      this.getList(1);
    }
  }
</script>

<style scoped>
  .planPopup-edit-main {
    display: flex;
    flex-direction: column;
  }
  .planPopup-edit-main .popup-content {
    flex: 1;
    overflow: auto;
  }
</style>
