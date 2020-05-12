import { resolveModuleName } from 'ts-pnp';

const _resolveModuleName = (typescript, moduleName, containingFile, compilerOptions, resolutionHost) => {
  return resolveModuleName(moduleName, containingFile, compilerOptions, resolutionHost, typescript.resolveModuleName);
};
export { _resolveModuleName as resolveModuleName };

export function resolveTypeReferenceDirective(
  typescript,
  moduleName,
  containingFile,
  compilerOptions,
  resolutionHost
) {
  return resolveModuleName(
    moduleName,
    containingFile,
    compilerOptions,
    resolutionHost,
    typescript.resolveTypeReferenceDirective
  );
}
