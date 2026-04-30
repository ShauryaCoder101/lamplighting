import { NeatGradient } from "@firecms/neat";

const config = {
    colors: [
        {
            color: '#AF1C22',
            enabled: true,
        },
        {
            color: '#E9D138',
            enabled: true,
        },
        {
            color: '#9EBB38',
            enabled: true,
        },
        {
            color: '#62ADC4',
            enabled: true,
        },
        {
            color: '#132468',
            enabled: true,
        },
    ],
    speed: 4,
    horizontalPressure: 3,
    verticalPressure: 4,
    waveFrequencyX: 3,
    waveFrequencyY: 2,
    waveAmplitude: 2,
    shadows: 2,
    highlights: 5,
    colorBrightness: 1.05,
    colorSaturation: 1.9,
    wireframe: false,
    colorBlending: 9,
    backgroundColor: '#8A8D99',
    backgroundAlpha: 1,
    grainScale: 2,
    grainSparsity: 0,
    grainIntensity: 0.05,
    grainSpeed: 1,
    resolution: 0.5,
    yOffset: -227.89999389648438,
    yOffsetWaveMultiplier: 8.5,
    yOffsetColorMultiplier: 7.8,
    yOffsetFlowMultiplier: 9,
    flowDistortionA: 3.7,
    flowDistortionB: 1.4,
    flowScale: 2.9,
    flowEase: 0.32,
    flowEnabled: false,
    enableProceduralTexture: false,
    textureVoidLikelihood: 0.27,
    textureVoidWidthMin: 60,
    textureVoidWidthMax: 420,
    textureBandDensity: 1.2,
    textureColorBlending: 0.06,
    textureSeed: 333,
    textureEase: 0.25,
    proceduralBackgroundColor: '#0E0707',
    textureShapeTriangles: 20,
    textureShapeCircles: 15,
    textureShapeBars: 15,
    textureShapeSquiggles: 10,
    domainWarpEnabled: true,
    domainWarpIntensity: 0.65,
    domainWarpScale: 6.6,
    vignetteIntensity: 1,
    vignetteRadius: 0.8,
    fresnelEnabled: false,
    fresnelPower: 2,
    fresnelIntensity: 0.5,
    fresnelColor: '#FFFFFF',
    iridescenceEnabled: false,
    iridescenceIntensity: 1,
    iridescenceSpeed: 1,
    bloomIntensity: 2.1,
    bloomThreshold: 0.7,
    chromaticAberration: 0.5,
};

const gradient = new NeatGradient({
    ref: document.getElementById("gradient"),
    ...config
});

// Optional: react to scroll
window.addEventListener("scroll", () => {
    gradient.yOffset = window.scrollY;
});
