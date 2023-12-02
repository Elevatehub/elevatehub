import { Injectable } from '@nestjs/common';
import { CreateOpenapiDto } from './dto/create-openapi.dto';
import { UpdateOpenapiDto } from './dto/update-openapi.dto';

@Injectable()
export class OpenapiService {
  async find(keyword: string) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: keyword }],
      temperature: 0.7,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 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',
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };

    const getData = await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((error) => {
        // console.log(error);
        return [];
      });
    return { message: getData };
  }
}
