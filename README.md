# Atelier Package Manager (VPM listing)

StudioRaming packages for the VRChat Creator Companion (VCC).

## 추가하기 / Add to VCC / VCCに追加

- 한 번에 추가 / One click / ワンクリック: https://studioraming.github.io/atelier-package-manager/
- 주소 / URL: `https://studioraming.github.io/atelier-package-manager/index.json`

VCC: Settings > Packages > Add Repository에 위 주소를 붙여 넣어도 됩니다. / You can also paste the URL in Settings > Packages > Add Repository. / Settings > Packages > Add Repository にURLを貼り付けても追加できます。

## 패키지 / Packages

| Package | |
|---|---|
| `com.studioraming.manager` | Atelier Manager: 아틀리에 상품 받기·설치·업데이트 / download, install and update Atelier products / アトリエ商品のダウンロード・インストール・アップデート |

VCC 없이 쓰려면 / Without VCC / VCCなしで: [Atelier-Manager.unitypackage](https://github.com/StudioRaming/Onairdeck-Unity-Manager/releases/latest/download/Atelier-Manager.unitypackage)

## 새 버전 올리기 (maintainers)

1. 패키지 레포에서 GitHub Release를 만들고 VPM zip(루트에 package.json)을 올린다.
2. `node tools/add-version.mjs <zip> <release zip url>`: zip의 package.json과 sha256으로 항목을 만든다. 이미 있는 버전은 바꾸지 않는다.
3. 커밋·push하면 GitHub Pages가 `index.json`을 내보낸다. 올린 뒤 주소로 다시 받아 sha256을 대조한다.
