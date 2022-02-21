export function updateEntity<
  ModuleState,
  EntityType extends { id: string | number }
>(
  state: ModuleState,
  entity: keyof ModuleState,
  value: EntityType,
  oldId: string | number | null = null
) {
  oldId = oldId ?? value.id;
  const arr = state[entity] as unknown as EntityType[];
  const index = arr.findIndex(({ id }) => id === oldId);
  if (~index) {
    arr.splice(index, 1, value);
  }
}

/**
 * Универсальная мутация для удаления элемента массива
 * @param {object} payload
 */
export function deleteEntity<
  ModuleState,
  EntityType extends { id: string | number }
>(state: ModuleState, entity: keyof ModuleState, id: string | number) {
  const arr = state[entity] as unknown as EntityType[];
  const index = arr.findIndex((item) => item.id === id);
  if (~index) {
    arr.splice(index, 1);
  }
}
