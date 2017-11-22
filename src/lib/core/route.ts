const ROUTE_PATTERN_KEY = '__luminant__isRoute'

export function decorateRouteComponent(pattern: string, component: any) {
  component[ROUTE_PATTERN_KEY] = pattern
}

export function getRouteComponentPath(component: any) {
  return component[ROUTE_PATTERN_KEY]
}

export function isRouteComponent(component: any) {
  return Boolean(getRouteComponentPath(component))
}
