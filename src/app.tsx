import xs from 'xstream'
import {Sources, Sinks} from './interfaces'
import {div,label, input, h2} from '@cycle/dom';

export function App(sources : any) {
  const changeWeight$ = sources.DOM.select('.weight').events('input')
    .map(ev => ev.target.value);
  const changeHeight$ = sources.DOM.select('.height').events('input')
    .map(ev => ev.target.value);
  const state$ = xs.combine(changeWeight$.startWith(70), changeHeight$.startWith(160))
    .map(([weight, height]:any) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return {bmi, weight, height};
    })
  const vdom$ = state$.map(state =>
    div([
      div([
        label('Weight: ' + state.weight + "kg"),
        input('.weight', {attrs: {type: 'range', min: 40, max: 150, value: state.weight}})
      ]),
      div([
        label('Height: ' + state.height + "cm"),
        input('.height', {attrs: {type: 'range', min: 150, max: 220, value: state.height}})
      ]),
      h2('BMI is ' + state.bmi)
    ])
  )

  return {
    DOM: vdom$
  }
}
