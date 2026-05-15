/**
 * Cloudflare Pages Function: 处理文件上传到 R2
 * 接口路径: /upload
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 检查 R2 存储桶绑定
    // 用户提到桶名是 asset，通常绑定名也叫 ASSET 或 asset
    const bucket = env.asset || env.ASSET;
    if (!bucket) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'R2 bucket "asset" is not bound to this function.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 解析 multipart/form-data
    const formData = await request.formData();
    const projectName = formData.get('projectName');
    const files = formData.getAll('files');

    if (!projectName || files.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Project name and files are required.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 逐个上传文件到 R2
    const uploadPromises = files.map(async (file) => {
      // 如果是 File 对象（通常是）
      if (file instanceof File) {
        // 这里的 name 可能是 webkitRelativePath 传过来的路径
        // 在前端上传时，我们手动 append 了路径作为第三个参数
        // formData.append('files', file, path);
        const filePath = file.name; 
        const key = `app/${projectName}/${filePath}`;
        
        // 获取文件内容
        const buffer = await file.arrayBuffer();
        
        // 设置 Content-Type
        const contentType = file.type || 'application/octet-stream';

        // 写入 R2
        await bucket.put(key, buffer, {
          httpMetadata: { contentType: contentType }
        });
        
        return key;
      }
    });

    await Promise.all(uploadPromises);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully uploaded ${files.length} files to project: ${projectName}`
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
