import xs from 'xstream'
import {Sources, Sinks} from './interfaces'
import {div, button, h1, h4, a} from '@cycle/dom';

export function App(sources : any) {
  const click$ = sources.DOM.select('.get-first').events('click');

  const request$ = click$.map(ev =>
    ({
      url: 'http://jsonplaceholder.typicode.com/users/1',
      method: 'GET',
      category: 'user-data'
    })
  )

  const responses$ = sources.HTTP
    .select('user-data')
    .flatten()
    .map(res => res.body);
  
    const vdom$ = responses$.startWith({}).map(res =>
      div([
        button('.get-first', 'Get First user'),
        div('.user-details', [
          h1('.user-name', res.name),
          h4('.user-email', res.email),
          a('.user-website', {attrs: {href: res.website}}, 'website')
        ])
      ])
    )

  return {
    DOM: vdom$,
    HTTP: request$
  }
}
