export const s = (s) => {
  let c

  s.setup = () => {
    c = s.createCanvas(500, 500)
    c.parent('p5Canvas')
    s.background(0)
  }

  s.draw = () => {
  }
}
