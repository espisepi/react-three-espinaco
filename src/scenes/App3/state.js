const state = {
    top: 0,
    pages: 0, //page is calculated in runtime by flexbox
    threshold: 4,
    mouse: [0, 0],
    content: [
      {
        tag: '00',
        text: `The Bacchic\nand Dionysiac\nRites`,
        images: ['assets/img/waternormals.jpg', 'assets/img/waternormals.jpg', 'assets/img/waternormals.jpg'],
      },
      { tag: '01', text: `The Elysian\nMysteries`, images: ['assets/img/waternormals.jpg', 'assets/img/waternormals.jpg', 'assets/img/waternormals.jpg'] },
      { tag: '02', text: `The Hiramic\nLegend`, images: ['assets/img/waternormals.jpg', 'assets/img/waternormals.jpg', 'assets/img/waternormals.jpg'] },
    ],
    depthbox: [
      {
        depth: 0,
        color: '#cccccc',
        textColor: '#ffffff',
        text: 'In a void,\nno one could say\nwhy a thing\nonce set in motion\nshould stop anywhere.',
        image: 'assets/img/waternormals.jpg',
      },
      {
        depth: -5,
        textColor: '#272727',
        text: 'For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum.',
        image: 'assets/img/waternormals.jpg',
      },
    ],
    lines: [
      { points: [[-20, 0, 0], [-9, 0, 0]], color: "black", lineWidth: 0.5 },
      { points: [[20, 0, 0], [9, 0, 0]], color: "black", lineWidth: 0.5 },
    ]
  }
  
  export default state
  