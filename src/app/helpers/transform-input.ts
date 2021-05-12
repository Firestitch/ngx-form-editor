import * as _snakecaseKeys from 'snakecase-keys';

export function transformInput(data, configCase: 'snake' | 'camel') {
  if (Array.isArray(data)) {
    return data.map(item => {
      return configCase === 'snake' ? _snakecaseKeys(item, { deep: true }) : item;
    });
  } else if (data) {
    return configCase === 'snake' ? _snakecaseKeys(data, { deep: true }) : data;
  }
}
