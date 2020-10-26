<template>
  <div class="content">
    <div class="comprehensive">
        <div class="comprehensive-top">
            <div :class="isShow==1?'top-item top-this':'top-item'" @click="changeItem(1);">仓房信息</div>
            <div :class="isShow==2?'top-item top-this':'top-item'" @click="changeItem(2);">储粮情况</div>
            <div :class="isShow==3?'top-item top-this':'top-item'" @click="changeItem(3);">三温两湿</div>
            <div :class="isShow==4?'top-item top-this':'top-item'" @click="changeItem(4);">虫害监控</div>
            <div :class="isShow==5?'top-item top-this':'top-item'" @click="changeItem(5);">气体监控</div>
            <div :class="isShow==6?'top-item top-this':'top-item'" @click="changeItem(6);">视屏监控</div>
            <div :class="isShow==7?'top-item top-this':'top-item'" @click="changeItem(7);">设备管理</div>
        </div>
        <div class="comprehensive-content">
            <div class="info">
              <div id="feedback"></div>
            </div>
            <canvas id="example"> 
              
            </canvas>
        </div>
    </div>
  </div>
</template>
<style type="text/css" scoped>
  .comprehensive-content{
      top: 80px;
      background: url(../../../static/models/bg.jpg);
      background-size: 100%;    
  }
  .comprehensive-content .info{
    position: relative;
    top: 10px;
    width: 100%;
    z-index: 20;
    text-align: center;
  }
  .comprehensive-content canvas{
    width: 100%;
    height: 100%;
  }
</style>
<script>
export default {
  name: "document",
  data() {
    return {
      isShow:1
    };
  },
  methods: {
    init:function () {
        var OBJLoader2Example = function(elementToBindTo) {
          this.renderer = null;
          this.canvas = elementToBindTo;
          this.aspectRatio = 1;
          this.recalcAspectRatio();
          this.scene = null;
          this.cameraDefaults = {
            posCamera: new THREE.Vector3(-5000,2000, 23000),
            // posCamera: new THREE.Vector3(-3000.0, 2000.0, 23000.0),
            posCameraTarget: new THREE.Vector3(0, 0, 0),
            near: 1,
            far: 50000,
            fov: 45
          };
          this.camera = null;
          this.cameraTarget = this.cameraDefaults.posCameraTarget;
          this.controls = null;
        };
        OBJLoader2Example.prototype = {
          constructor: OBJLoader2Example,
          initGL: function() {
            this.renderer = new THREE.WebGLRenderer({
              canvas: this.canvas,
              antialias: true,
              autoClear: true,
              alpha: true
            });
            // this.renderer.setClearColor(0x050505);
             this.renderer.setClearAlpha(0.1);

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far);
            this.resetCamera();
            this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
            var ambientLight = new THREE.AmbientLight(0xffffff,2);
            this.scene.add(ambientLight);
            var directionalLight1 = new THREE.DirectionalLight(0xffffff);
    //        var directionalLight2 = new THREE.DirectionalLight(0xC0C090);
            directionalLight1.position.set(-100, -50, 100);
            // directionalLight1.intensity = 0.01;
    //        directionalLight2.position.set(100, 50, -100);
            this.scene.add(directionalLight1);
    //        this.scene.add(directionalLight2);
    //        var ambLight = new THREE.AmbientLight(0x404040);
    //        this.scene.add(ambLight);
    //        var pointLight = new THREE.PointLight("#ffffff");
    //          pointLight.intensity=2.3;
    //          pointLight.position.set(0,20000,20000);
    //          this.scene.add(pointLight);

            //var helper = new THREE.GridHelper(1200, 60, 0xFF4444, 0x404040);
            //this.scene.add(helper);
          },
          initContent: function() {
            var modelName = 'female02';
            this._reportProgress({
              detail: {
                text: 'Loading: ' + modelName
              }
            });
            var scope = this;
            var objLoader = new THREE.OBJLoader2();
            var callbackOnLoad = function(event) {
              scope.scene.add(event.detail.loaderRootNode);
              console.log('Loading complete: ' + event.detail.modelName);
              scope._reportProgress({
                detail: {
                  text: '示范库3D模型'
                }
              });
            };
            var onLoadMtl = function(materials) {
              objLoader.setModelName(modelName);
              objLoader.setMaterials(materials);
              objLoader.setLogging(true, true);
              objLoader.load('../../../static/models/obj/mesh.obj', callbackOnLoad, null, null, null, false);
            };
            objLoader.loadMtl('../../../static/models/obj/mesh.mtl', null, onLoadMtl);
          },
          _reportProgress: function(event) {
            var output = THREE.LoaderSupport.Validator.verifyInput(event.detail.text, '');
            console.log('Progress: ' + output);
            document.getElementById('feedback').innerHTML = output;
          },
          resizeDisplayGL: function() {
            this.controls.handleResize();
            this.recalcAspectRatio();
            this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight, false);
            this.updateCamera();
          },
          recalcAspectRatio: function() {
            this.aspectRatio = (this.canvas.offsetHeight === 0) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
          },
          resetCamera: function() {
            this.camera.position.copy(this.cameraDefaults.posCamera);
            this.cameraTarget.copy(this.cameraDefaults.posCameraTarget);
            this.updateCamera();
          },
          updateCamera: function() {
            this.camera.aspect = this.aspectRatio;
            this.camera.lookAt(this.cameraTarget);
            this.camera.updateProjectionMatrix();
          },
          render: function() {
            if(!this.renderer.autoClear) this.renderer.clear();
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
          }
        };
         // var controls;
        //   function initControls() {

        //       controls = new THREE.FirstPersonControls(camera);
        //       controls.lookSpeed = 0.2; //鼠标移动查看的速度
        //       controls.movementSpeed = 20; //相机移动速度
        //       controls.noFly = true;
        //       controls.constrainVertical = true; //约束垂直
        //       controls.verticalMin = 1.0;
        //       controls.verticalMax = 2.0;
        //       controls.lon = -100; //进入初始视角x轴的角度
        //       controls.lat = 0; //初始视角进入后y轴的角度
        //   }
        //   initControls();
        var app = new OBJLoader2Example(document.getElementById('example'));
        var resizeWindow = function() {
          app.resizeDisplayGL();
        };
        var render = function() {
          requestAnimationFrame(render);
          app.render();
        };
        window.addEventListener('resize', resizeWindow, false);
        console.log('Starting initialisation phase...');
        app.initGL();
        app.resizeDisplayGL();
        app.initContent();
        render();
    },
    changeItem:function (num) {
      var vm=this;
      vm.isShow=num;
    }

  },
  mounted() {
    this.init();
  }
};

</script>
