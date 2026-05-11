import type { StructureResolver } from "sanity/structure";

export const myceliumStructure: StructureResolver = (S) =>
  S.list()
    .title("Mycélium")
    .items([
      S.listItem()
        .title("Membres")
        .schemaType("member")
        .child(S.documentTypeList("member").title("Membres")),
      S.divider(),
      S.listItem()
        .title("Agenda & expositions")
        .schemaType("event")
        .child(S.documentTypeList("event").title("Événements")),
      S.listItem()
        .title("Billets (flux)")
        .schemaType("billet")
        .child(S.documentTypeList("billet").title("Tous les billets")),
      S.divider(),
      S.listItem()
        .title("Billets par membre")
        .child(
          S.documentTypeList("member")
            .title("Choisir un membre")
            .child((memberId) =>
              S.documentList()
                .title("Billets liés")
                .filter('_type == "billet" && author._ref == $memberId')
                .params({ memberId: String(memberId) })
                .apiVersion("2024-01-01"),
            ),
        ),
    ]);
