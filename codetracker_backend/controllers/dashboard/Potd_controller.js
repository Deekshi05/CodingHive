import { Potd } from "../../models/Potd.js";
import {getLeetcodePotd} from "../../utils/potds/leetcode.js";
import {getGfgPotd} from "../../utils/potds/gfg.js";

import moment from "moment";

export const potdController = async (req, res) => {
  try {
    const today = moment().startOf('day');

    // 1. Fetch today's existing entries
    const potds = await Potd.find({
      lastUpdated: { $gte: today.toDate() }
    });

    let leetcodePotd = potds.find(p => p.platform === 'leetcode');
    let gfgPotd = potds.find(p => p.platform === 'gfg');

    // 2. Fetch from source if not in DB
    if (!leetcodePotd) {
      const leetcodeUrl = await getLeetcodePotd();
      leetcodePotd = await Potd.create({
        platform: 'leetcode',
        url: leetcodeUrl
      });
    }

    if (!gfgPotd) {
      const gfgUrl = await getGfgPotd();
      gfgPotd = await Potd.create({
        platform: 'gfg',
        url: gfgUrl
      });
    }

    // 3. Send response
    return res.status(200).json({
      message: "POTDs fetched successfully",
      leetcode: leetcodePotd.url,
      gfg: gfgPotd.url
    });

  } catch (error) {
    console.error("POTD Controller Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

