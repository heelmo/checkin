const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return
  try {
    const headers = {
      'cookie': cookie,
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    const checkin = await fetch('https://glados.rocks/api/user/checkin', {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: '{"token":"glados.one"}',
    }).then((r) => r.json())
    const status = await fetch('https://glados.rocks/api/user/status', {
      method: 'GET',
      headers,
    }).then((r) => r.json())
    return [
      'Checkin OK',
      `${checkin.message}`,
      `Left Days ${Number(status.data.leftDays)}`,
    ]
  } catch (error) {
    return [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

// const notify = async (contents) => {
//   const token = process.env.NOTIFY
//   if (!token || !contents) return
//   await fetch(`https://www.pushplus.plus/send`, {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       token,
//       title: contents[0],
//       content: contents.join('<br>'),
//       template: 'markdown',
//     }),
//   })
// }

// const notify = async (contents) => {
//   const token = process.env.NOTIFY;
//   if (!token || !contents) {
//     console.warn('Notify skipped: Missing NOTIFY environment variable or contents');
//     return;
//   }

//   try {
//     await fetch('https://www.pushplus.plus/send', {
//       method: 'POST',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({
//         token,
//         title: contents[0],
//         content: contents.join('<br>'), // 使用 <br> 分隔多行文本
//         template: 'markdown', // 推送模板
//       }),
//       timeout: 10000, // 设置超时时间为 10 秒
//     });
//     console.log('Notification sent successfully');
//   } catch (error) {
//     console.error('Notify Error:', error);
//   }
// };

const main = async () => {
  // await notify(await glados())
  await glados()
}

main()
