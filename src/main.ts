import * as core from '@actions/core'
import axios from 'axios';

async function run(): Promise<void> {
    const channelCode:string = core.getInput('channelCode');
    const head:string = core.getInput('head');
    const body:string = core.getInput('body')??"";
    const url:string = `https://www.phprm.com/services/push/trigger/${channelCode}`;
    if (!channelCode) {
        // 防止发起无效请求
        return;
    }
    try {
      axios.defaults.timeout = 10000;
      const ret = await axios
          .post(url, {
            head: head,
            body: body,
          })
      return ret.data??false;
    } catch (error) {
      if (error instanceof Error) {
          console.log(error.stack)
          core.setFailed(error.message)
      }
    }
}

run()
