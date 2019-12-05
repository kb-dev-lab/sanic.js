#include <napi.h>

Napi::Value Filter(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  if (info.Length() < 2)
  {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsArray())
  {
    Napi::TypeError::New(env, "array must be of type Array").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[1].IsFunction())
  {
    Napi::TypeError::New(env, "fn must be of type Function").ThrowAsJavaScriptException();
    return env.Null();
  }

  Napi::Value thisContext;

  if (info[2].IsObject())
  {
    thisContext = info[2];
  }

  Napi::Array array = info[0].As<Napi::Array>();
  Napi::Function fn = info[1].As<Napi::Function>();
  Napi::Boolean elementIsValid;

  Napi::Array result = Napi::Array::New(env);
  Napi::Value element;
  uint32_t currentResult = 0;
  uint32_t length = array.Length();

  for (uint32_t i = 0; i < length; i++)
  {
    element = array[i];
    elementIsValid = fn.Call({element}).As<Napi::Boolean>();

    if (elementIsValid)
    {
      result.Set(currentResult, element);
      currentResult++;
    }
  }

  result.Set("length", currentResult);

  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  printf("hi");
  exports.Set(Napi::String::New(env, "filter"), Napi::Function::New(env, Filter));
  return exports;
}

NODE_API_MODULE(addon, Init)