import type { ComponentResolver } from 'unplugin-vue-components';
import { kebabCase } from 'unplugin-vue-components';

export function ThorUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Tui[A-Z]/)) {
        const componentName = name.replace(/^(.)(.*)$/, (match, firstChar, restOfStr) => {
          return firstChar.toLowerCase() + restOfStr;
        })
        const partialName = kebabCase(name)
        return {
          componentName,
          from: `thorui-uni/lib/thorui/${partialName}/${partialName}.vue`,
        }
      }
    }
  }
}