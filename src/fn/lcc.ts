import { type AnySoupElement, length } from "circuit-json"
import type { z } from "zod"
import { base_quad_def, quad, quadTransform } from "./quad"

export const lcc_def = base_quad_def.extend({}).transform(quadTransform)

export const lcc = (
  parameters: z.input<typeof lcc_def>,
): { circuitJson: AnySoupElement[]; parameters: any } => {
  if (parameters.p !== undefined && length.parse(parameters.p) <= 0) {
    throw new Error("LCC pitch must be greater than zero")
  }
  parameters.legsoutside = false
  if (!parameters.pl) {
    parameters.pl = 1.0
  }
  if (!parameters.pw) {
    parameters.pw = 0.6
  }
  return quad(parameters)
}
