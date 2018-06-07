import * as THREEx from "threex";

export function initializeArToolkit(renderer, camera, onRenderFcts) {
  THREEx.ArToolkitContext.baseURL = "../";

  const arToolkitSource = new THREEx.ArToolkitSource({ sourceType: "webcam" });

  arToolkitSource.init(() => {
    arToolkitSource.onResize(renderer.domElement);
  });

  window.addEventListener("resize", () => {
    arToolkitSource.onResize(renderer.domElement);
  });

  // create atToolkitContext
  const arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: cameraData,
    detectionMode: "mono",
    maxDetectionRate: 30,
    canvasWidth: 800,
    canvasHeight: 600
  });

  arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  // update artoolkit on every frame
  onRenderFcts.push(() => {
    if (arToolkitSource.ready === false) return;

    arToolkitContext.update(arToolkitSource.domElement);
  });

  return arToolkitContext;
}
