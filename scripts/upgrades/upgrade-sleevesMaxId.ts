import { ethers, run } from "hardhat";
import {
  convertFacetAndSelectorsToString,
  DeployUpgradeTaskArgs,
  FacetsAndAddSelectors,
} from "../../tasks/deployUpgrade";
import {
  maticDiamondAddress,
  maticDiamondUpgrader,
  itemManagerAlt,
} from "../helperFunctions";
import { SvgFacetInterface } from "../../typechain/SvgFacet";
import { SvgFacet__factory } from "../../typechain";
import { BigNumberish } from "@ethersproject/bignumber";

export async function upgrade() {
  const facets: FacetsAndAddSelectors[] = [
    {
      facetName: "SvgFacet",
      addSelectors: [],
      removeSelectors: [],
    },
  ];

  const joined = convertFacetAndSelectorsToString(facets);

  let iface: SvgFacetInterface = new ethers.utils.Interface(
    SvgFacet__factory.abi
  ) as SvgFacetInterface;

  const maxUint256: BigNumberish = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

  const payload: any = [
    {
      sleeveId: maxUint256,
      wearableId: 2,
    },
    {
      sleeveId: maxUint256,
      wearableId: 5,
    },
    {
      sleeveId: maxUint256,
      wearableId: 34,
    },
    {
      sleeveId: maxUint256,
      wearableId: 68,
    },
    {
      sleeveId: maxUint256,
      wearableId: 78,
    },
    {
      sleeveId: maxUint256,
      wearableId: 81,
    },
    {
      sleeveId: maxUint256,
      wearableId: 88,
    },
    {
      sleeveId: maxUint256,
      wearableId: 95,
    },
    {
      sleeveId: maxUint256,
      wearableId: 98,
    },
    {
      sleeveId: maxUint256,
      wearableId: 132,
    },
    {
      sleeveId: maxUint256,
      wearableId: 143,
    },
    {
      sleeveId: maxUint256,
      wearableId: 200,
    },
    {
      sleeveId: maxUint256,
      wearableId: 207,
    },
    {
      sleeveId: maxUint256,
      wearableId: 227,
    },
    {
      sleeveId: maxUint256,
      wearableId: 230,
    },
    {
      sleeveId: maxUint256,
      wearableId: 297,
    },
    {
      sleeveId: maxUint256,
      wearableId: 307,
    },
  ];

  const calldata = iface.encodeFunctionData("setSleeves", [payload]);

  const args: DeployUpgradeTaskArgs = {
    diamondUpgrader: maticDiamondUpgrader,
    diamondAddress: maticDiamondAddress,
    facetsAndAddSelectors: joined,
    useLedger: true,
    useMultisig: true,
    initAddress: maticDiamondAddress,
    initCalldata: calldata,
  };

  await run("deployUpgrade", args);
  console.log("Sleeves Set");
}

if (require.main === module) {
  upgrade()
    .then(() => process.exit(0))
    // .then(() => console.log('upgrade completed') /* process.exit(0) */)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
