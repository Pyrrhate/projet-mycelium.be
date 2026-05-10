import type { StructureResolver } from "sanity/structure";

/**
 * Filtrage par membre : chaque collaborateur retrouve ses nœuds
 * via « Nœuds par membre » → choix du document membre.
 */
export const myceliumStructure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Membres")
        .schemaType("member")
        .child(S.documentTypeList("member").title("Tous les membres")),
      S.listItem()
        .title("Nœuds de contenu")
        .schemaType("nodeContent")
        .child(S.documentTypeList("nodeContent").title("Tous les nœuds")),
      S.divider(),
      S.listItem()
        .title("Nœuds par membre")
        .child(
          S.documentTypeList("member")
            .title("Choisir un membre")
            .child((memberId) =>
              S.documentList()
                .title("Nœuds liés à ce membre")
                .filter('_type == "nodeContent" && author._ref == $memberId')
                .params({ memberId: String(memberId) })
                .apiVersion("2024-01-01"),
            ),
        ),
    ]);
